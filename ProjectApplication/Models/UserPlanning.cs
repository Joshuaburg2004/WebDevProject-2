public class UserPlanning
{
    public Guid userId;
    public List<string> Planning = new List<string>();
    
    
    
    public UserPlanning(User user)
    {
        userId = user.Id;
    }

    public UserPlanning(Guid userId)
    {
        this.userId = userId;
    }

    public void AddDayPlannig(string day, string from, string to, string onSiteOrOnline){

        Planning.Add($"Day: {day}, from: {from} - to: {to}, on site or online: {onSiteOrOnline}");
    }
}