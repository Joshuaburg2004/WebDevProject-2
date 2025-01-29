// filepath: /d:/School local/Jaar 3 stuffs/WebDev/project/WebDevProject-2/ProjectApplication/Program.cs
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Cors;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddTransient<IUserStorage, UserStorage>();
builder.Services.AddTransient<IAdminStorage, AdminStorage>();
builder.Services.AddTransient<IUserPlanningStorage, UserPlanningStorage>();
builder.Services.AddDbContext<DatabaseContext>(x => x.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));

// Configure CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAllOrigins",
        builder =>
        {
            builder.AllowAnyOrigin()
                   .AllowAnyMethod()
                   .AllowAnyHeader();
        });
});

var app = builder.Build();

// Use CORS
app.UseCors("AllowAllOrigins");

app.Use(async (context, next) =>
{
    await next.Invoke();
    Console.WriteLine($"{context.Request.Path} was handled");
    context.Request.EnableBuffering();
});

app.MapGet("/", () => "Hello World!");
app.MapControllers();
app.Urls.Add("http://localhost:5000");
app.Run();