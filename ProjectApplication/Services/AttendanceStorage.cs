using System.Text.Json;
public class AttendanceStorage : IAttendanceStorage{
    public async Task CreateAttendance(Attendance attendance){
        var attendances = JsonSerializer.Deserialize<List<Attendance>>(System.IO.File.ReadAllText($"attendances/attendances.json"));
        if(attendances is null){ attendances = new List<Attendance>(); }
        attendances.Add(attendance);
        await System.IO.File.WriteAllTextAsync($"attendances/attendances.json", JsonSerializer.Serialize(attendances));
    }

    public async Task DeleteAttendance(Attendance attendance) {
        var attendances = JsonSerializer.Deserialize<List<Attendance>>(System.IO.File.ReadAllText($"attendances/attendances.json"));
        if(attendances is null){ return; }
        attendances.Remove(attendance);
        await System.IO.File.WriteAllTextAsync($"attendances/attendances/{attendance.Id}", JsonSerializer.Serialize(attendance));
    }

    public async Task<Attendance?> FindAttendance(Guid attendanceId) {
        var attendances = JsonSerializer.Deserialize<List<Attendance>>(await System.IO.File.ReadAllTextAsync($"attendances/attendances.json"));
        if(attendances is null){ return null; }
        var attendance = attendances.FirstOrDefault(a => a.Id == attendanceId);
        return attendance;
    }

    public async Task<List<Attendance>> FindManyAttendances(Guid[] attendanceIds) {
        var attendances = new List<Attendance>();
        foreach (var attendanceId in attendanceIds) {
            var attendance = await FindAttendance(attendanceId);
            if (attendance != null) attendances.Add(attendance);
        }
        return attendances;
    }
}