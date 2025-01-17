using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using System.Text.Json; 
using Microsoft.EntityFrameworkCore;
public class UserStorage : IUserStorage
{
    private readonly DatabaseContext _context;
    public UserStorage(DatabaseContext context)
    {
        _context = context;
    }
    public async Task<User?> CreateUser(User user) 
    {
        if(user is null || _context.Users.Where(x => x.Email == user.Email).Any()) return null;
        await _context.Users.AddAsync(user);
        await _context.SaveChangesAsync();
        return user;
    }
    
    public async Task SaveUser(User user) => 
    await CreateUser(user);

    public async Task<User?> FindUser(Guid userId) {
        var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == userId);
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

    public async Task<bool> DeleteUser(User user) {
        _context.Users.Remove(user);
        int changed = await _context.SaveChangesAsync();
        if(changed == 0) return false;
        return true;
    }

    public async Task<List<User>> GetAllUsers() {
        return await _context.Users.ToListAsync();
    }
}