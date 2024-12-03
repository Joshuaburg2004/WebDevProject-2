interface IAttendanceStorage{
    public Task CreateAttendance(Attendance attendance);
    
    public Task DeleteAttendance(Attendance attendance);
    
    public Task<Attendance?> FindAttendance(Guid attendanceId);
    
    public Task<List<Attendance>> FindManyAttendances(Guid[] attendanceIds);
}