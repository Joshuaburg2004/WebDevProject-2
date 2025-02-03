using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
public interface IUserStorage
{
    public Task<User?> CreateUser(User user);

    public Task<bool> DeleteUser(User user);

    public Task<List<User>> GetAllUsers();

    public Task<User?> LogIn(string email, string password);
    
    public Task<User?> FindUser(Guid userId);
    
    public Task<List<User>> FindManyUsers(Guid[] userIds);
    

}