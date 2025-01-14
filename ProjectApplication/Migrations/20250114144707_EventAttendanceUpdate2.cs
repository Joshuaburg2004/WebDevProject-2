using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ProjectApplication.Migrations
{
    /// <inheritdoc />
    public partial class EventAttendanceUpdate2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Ratings",
                table: "EventAttendances",
                type: "TEXT",
                nullable: false,
                defaultValue: "[]");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Ratings",
                table: "EventAttendances");
        }
    }
}
