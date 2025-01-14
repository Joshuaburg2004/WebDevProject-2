using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
public interface IUserPlanningStorage
{
    public Task CreatePlanning(UserPlanning userPlanning);

}