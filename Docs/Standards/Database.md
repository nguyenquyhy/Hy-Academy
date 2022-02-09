# Database

Database Object-Relational Mapping (ORM) will be handled by Entity Framework (EF) Core. Currently, EF is setup to connect to MySql database using `ConnectionStrings:Default` app settings.

## Entity Framework

To interact with EF, first install EF global tool
```
dotnet tool install --global dotnet-ef
```

EF global tool should be updated to everytime we update EF libraries.
```
dotnet tool update --global dotnet-ef
```

To add a new migration to database change:
```
dotnet ef migrations add <Migration Name> --startup-project HyAcademy.APIs --project HyAcademy.Data.EF.MySql
```

To update the database to latest migration (connection string in secret must be set beforehand):
```
dotnet ef database update --startup-project HyAcademy.APIs --project HyAcademy.Data.EF.MySql
```

## CI/CD

The database is not deployed by CI/CD at the moment. However, connection string is passed into API container using Container App secrets.