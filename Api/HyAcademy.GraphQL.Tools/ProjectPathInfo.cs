using System.Runtime.CompilerServices;

namespace HyAcademy.GraphQL.Tools;

internal static class ProjectPathInfo
{
    public static string CSharpClassPath;
    public static string ProjectPath;
    public static string SolutionPath;

    static ProjectPathInfo()
    {
        CSharpClassPath = GetSourceFilePathName();
        ProjectPath = Directory.GetParent(CSharpClassPath)!.FullName;
        SolutionPath = Directory.GetParent(ProjectPath)!.FullName;
    }

    private static string GetSourceFilePathName([CallerFilePath] string? callerFilePath = null) => callerFilePath ?? "";
}
