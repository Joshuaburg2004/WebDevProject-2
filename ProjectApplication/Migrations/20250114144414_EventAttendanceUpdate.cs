using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ProjectApplication.Migrations
{
    /// <inheritdoc />
    public partial class EventAttendanceUpdate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Feedback",
                table: "EventAttendances",
                type: "TEXT",
                nullable: false,
                defaultValue: "[]");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Feedback",
                table: "EventAttendances");
        }
    }
}
