public class EventAttendance
{
    public Guid? UserId;
    public Guid? EventId;

    // check for foreign key!!
    // relatively bad design. rework - make composite key.
    // make specific composite class and have that act as the primary key

    public List<int> Ratings { get; private set; }
    public double Rating { get {
            if(Ratings.Count == 0) return 0; 
            return Ratings.Average(); 
        } 
    }
    public List<string> Feedback { get; set; }
    
    public EventAttendance()
    {
        UserId = null;
        EventId = null;
        Ratings = new List<int>();
        Feedback = new List<string>();
    }

    public void FeedbackFunction(int newRating, string? newFeedback)
    {
        newRating = Math.Clamp(newRating, 1, 5);

        Ratings.Add(newRating);

        if(newFeedback != null && newFeedback != "")
            Feedback.Add(newFeedback);
    }
}
