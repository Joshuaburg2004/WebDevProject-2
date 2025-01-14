using Microsoft.EntityFrameworkCore;

public class DatabaseContext : DbContext { 
    public DbSet<Admin> Admins { get; set; }
    public DbSet<Event> Events { get; set; }
    public DbSet<EventAttendance> EventAttendances { get; set; }
    public DbSet<UserPlanning> UserPlannings { get; set; }
    public DbSet<User> Users { get; set; }
    public DatabaseContext(DbContextOptions<DatabaseContext> options) : base(options) { }
}