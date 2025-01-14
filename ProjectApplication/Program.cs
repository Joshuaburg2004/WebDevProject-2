using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllers();
builder.Services.AddTransient<IUserStorage, UserStorage>();
builder.Services.AddTransient<IAdminStorage, AdminStorage>();
builder.Services.AddTransient<IUserPlanningStorage, UserPlanningStorage>();
builder.Services.AddDbContext<DatabaseContext>(x => x.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));

var app = builder.Build();

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


