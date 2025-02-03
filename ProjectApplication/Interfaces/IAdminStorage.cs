public interface IAdminStorage{
    public Task CreateAdmin(Admin admin);
    
    public Task DeleteAdmin(Admin admin);
    
    public Task<Admin?> FindAdmin(Guid adminId);
    
    public Task<List<Admin>> FindManyAdmins(Guid[] adminIds);
}