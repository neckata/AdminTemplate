using System;
using System.Collections.Generic;
using System.IO;
using AdminTemplate.Data.Access.DAL;
using AdminTemplate.Data.Model;
using AdminTemplate.Filters;
using AdminTemplate.IoC;
using AdminTemplate.Security.Auth;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using Swashbuckle.AspNetCore.Swagger;
using AdminTemplate.Data.Access.Helpers;
using AdminTemplate.Data.Access.Constants;
using Microsoft.EntityFrameworkCore.Storage;
using Microsoft.EntityFrameworkCore.Infrastructure;

namespace AdminTemplate
{
    public class Startup
    {
        public Startup(IHostingEnvironment env)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", true, true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", true)
                .AddEnvironmentVariables();

            Configuration = builder.Build();
        }

        public IConfigurationRoot Configuration { get; }

        public static void Main(string[] args)
        {
            var host = new WebHostBuilder()
                .UseKestrel()
                .UseContentRoot(Directory.GetCurrentDirectory())
                .UseIISIntegration()
                .UseStartup<Startup>()
                .Build();

            host.Run();
        }

        public void ConfigureServices(IServiceCollection services)
        {
            ContainerSetup.Setup(services, Configuration);

            services.AddCors();

            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(JwtBearerDefaults.AuthenticationScheme, (o) =>
            {
                o.TokenValidationParameters = new TokenValidationParameters()
                {
                    IssuerSigningKey = TokenAuthOption.Key,
                    ValidAudience = TokenAuthOption.Audience,
                    ValidIssuer = TokenAuthOption.Issuer,
                    ValidateIssuerSigningKey = true,
                    ValidateLifetime = true,
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ClockSkew = TimeSpan.FromMinutes(0)
                };
            });

            services.AddAuthorization(auth =>
            {
                auth.AddPolicy(JwtBearerDefaults.AuthenticationScheme, new AuthorizationPolicyBuilder()
                    .AddAuthenticationSchemes(JwtBearerDefaults.AuthenticationScheme)
                    .RequireAuthenticatedUser().Build());
            });

            services.AddMvc(options => { options.Filters.Add(new ApiExceptionFilter()); })
                .AddJsonOptions(o =>
                {
                    o.SerializerSettings.DateTimeZoneHandling = DateTimeZoneHandling.Local;
                });
            ;
            services.AddNodeServices();

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new Info { Title = "AdminTemplate", Version = "v1" });
                c.OperationFilter<AuthorizationHeaderParameterOperationFilter>();
            });
        }

        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            loggerFactory.AddConsole(Configuration.GetSection("Logging"));
            loggerFactory.AddDebug();

            InitDatabase(app);

            app.UseStaticFiles();

            app.UseAuthentication();

            app.UseCors(builder => builder.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin());

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();

                app.UseSwagger();

                app.UseSwaggerUI(c => { c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1"); });

                app.MapWhen(x => !x.Request.Path.Value.StartsWith("/swagger"), builder =>
                {
                    builder.UseMvc(routes =>
                    {
                        routes.MapSpaFallbackRoute(
                            "spa-fallback",
                            new { controller = "Home", action = "Index" });
                    });
                });
            }
            else
            {
                app.UseMvc(routes =>
                {
                    routes.MapRoute(
                        "default",
                        "{controller=Home}/{action=Index}/{id?}");

                    routes.MapSpaFallbackRoute(
                        "spa-fallback",
                        new { controller = "Home", action = "Index" });
                });
                app.UseExceptionHandler("/Home/Error");
            }
        }

        private void InitDatabase(IApplicationBuilder app)
        {
            using (var serviceScope = app.ApplicationServices.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                var context = serviceScope.ServiceProvider.GetService<MainDbContext>();

                bool initDataBase = !context.Database.GetService<IRelationalDatabaseCreator>().Exists();

                context.Database.Migrate();

                if (initDataBase)
                {
                    Role admin = new Role { Name = Roles.Administrator };
                    Role manager = new Role { Name = Roles.Manager };
                    Role adminOrManager = new Role { Name = Roles.AdministratorOrManager };

                    context.Add(admin);
                    context.Add(manager);
                    context.Add(adminOrManager);
                    context.SaveChanges();

                    User user = new User()
                    {
                        Password = "admin".WithBCrypt(),
                        UserName = "admin",
                        Roles = new List<UserRole> { new UserRole { RoleID = admin.ID } }
                    };

                    context.Add(user);
                    context.SaveChanges();
                }
            }
        }
    }
}
