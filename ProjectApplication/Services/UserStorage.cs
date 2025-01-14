using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using System.Text.Json; 
using Microsoft.EntityFrameworkCore;
public class UserStorage : IUserStorage
{
    public DatabaseContext _context;
    public async Task CreateUser(User user) 
    {
        
    }
    
    public async Task SaveUser(User user) => 
    await CreateUser(user);

    public async Task<User?> FindUser(Guid userId) {
        var users = JsonSerializer.Deserialize<List<User>>(await System.IO.File.ReadAllTextAsync($"users/users.json"));
        if(users is null){ return null; }
        var user = users.FirstOrDefault(u => u.Id == userId);
        return user;
    }

    public async Task<List<User>> FindManyUsers(Guid[] userIds) {
        var users = new List<User>();
        foreach (var userId in userIds) {
            var user = await FindUser(userId);
            if (user != null) users.Add(user);
        }
        return users;
    }

    public async Task DeleteUser(User user) {
        var users = JsonSerializer.Deserialize<List<User>>(System.IO.File.ReadAllText($"users/users.json"));
        if(users is null){ return; }
        users.Remove(user);
        await System.IO.File.WriteAllTextAsync($"users/users/{user.Id}", JsonSerializer.Serialize(users));
    }
}