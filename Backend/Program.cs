using emigest_back.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// 1. Définir la politique CORS
builder.Services.AddCors(options => {
    options.AddPolicy("AllowReactApp",
        policy => policy.WithOrigins("http://localhost:3000") // L'URL de ton frontend React
                        .AllowAnyMethod()
                        .AllowAnyHeader());
});

// 2. AJOUTER LES SERVICES REQUIS
// ---- CONFIGURATION POSTGRESQL ICI ----
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));
// --------------------------------------

builder.Services.AddControllers(); // Requis puisque tu utilises app.MapControllers() plus bas
builder.Services.AddAuthorization(); 
builder.Services.AddEndpointsApiExplorer(); // Requis pour Swagger
builder.Services.AddSwaggerGen(); // Requis pour Swagger

var app = builder.Build();

// Appliquer la politique CORS
app.UseCors("AllowReactApp");

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// NOTE: Si tu ajoutes l'authentification plus tard (JWT, Cookies, etc.), 
// app.UseAuthentication() devra être placé juste ICI, avant UseAuthorization.
app.UseAuthorization(); 

// Mapping des contrôleurs
app.MapControllers();

app.Run();