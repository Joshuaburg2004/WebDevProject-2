using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ProjectApplication.Migrations
{
    /// <inheritdoc />
    public partial class userupdate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Last_name",
                table: "Users",
                newName: "LastName");

            migrationBuilder.RenameColumn(
                name: "First_name",
                table: "Users",
                newName: "FirstName");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "LastName",
                table: "Users",
                newName: "Last_name");

            migrationBuilder.RenameColumn(
                name: "FirstName",
                table: "Users",
                newName: "First_name");
        }
    }
}
