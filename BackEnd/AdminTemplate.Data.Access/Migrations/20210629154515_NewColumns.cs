using Microsoft.EntityFrameworkCore.Migrations;

namespace AdminTemplate.Data.Access.Migrations
{
    public partial class NewColumns : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Username",
                table: "Users",
                newName: "UserName");

            migrationBuilder.AddColumn<string>(
                name: "Adress",
                table: "Users",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "City",
                table: "Users",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Code",
                table: "Users",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Country",
                table: "Users",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Info",
                table: "Users",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Adress",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "City",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "Code",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "Country",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "Info",
                table: "Users");

            migrationBuilder.RenameColumn(
                name: "UserName",
                table: "Users",
                newName: "Username");
        }
    }
}
