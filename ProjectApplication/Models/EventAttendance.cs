public class EventAttendance
{
    public Guid Id;
    public Guid? user_id;
    public Guid? event_id;

    // check for foreign key!!
    // relatively bad design. rework - make composite key.
    // make specific composite class and have that act as the primary key

    private List<int> _ratings;
    public double Rating;
    public List<string> Feedback;
    

    public EventAttendance(Guid id)
    {
        Id = id;
        user_id = null;
        event_id = null;
        _ratings = new List<int>();
        Rating = 0; // between 1 and 5
        Feedback = new List<string>();
    }

    public void FeedbackFunction(int newRating, string? newFeedback)
    {
        newRating = Math.Clamp(newRating, 1, 5);

        _ratings.Add(newRating);
        Rating = _ratings.Average();

        if(newFeedback != null && newFeedback != "")
            Feedback.Add(newFeedback);
    }
}
