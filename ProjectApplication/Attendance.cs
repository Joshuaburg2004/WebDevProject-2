public class Attendance
{
    public Guid Id { get; set; }
    public Guid user_id { get; set; }
    public DateOnly date { get; set; }

    public Attendance(Guid id, User user)
    {
        Id = id;
        user_id = user.Id;
        date = DateOnly.FromDateTime(DateTime.Now);
        //date = null;
    }
}