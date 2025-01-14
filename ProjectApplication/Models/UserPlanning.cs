using System.ComponentModel.DataAnnotations;

public class UserPlanning
{
    [Key]
    public Guid UserId { get; set; }
    // public List<string> Planning = new List<string>();
    public string? Day { get; set; }
    public string? From { get; set; }
    public string? To { get; set; }
    public string? OnSiteOrOnline { get; set; }
    
    public UserPlanning(Guid user)
    {
        UserId = user;
        Day = null;
        From = null;
        To = null;
        OnSiteOrOnline = null;
    }

    public UserPlanning(){}

    // public void AddDayPlannig(string day, string from, string to, string onSiteOrOnline){

    //     Planning.Add($"Day: {day}, from: {from} - to: {to}, on site or online: {onSiteOrOnline}");
    // }
}