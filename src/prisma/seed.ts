import { db, disconnectDB } from "./db";

const userId = "c5dd7ae5-27f2-4bce-ab91-e7092468c7e0";

const movies = [
    {
        title: "Inception",
        overview: "A skilled thief who steals secrets through dreams is given a chance to erase his past by planting an idea in someone's mind.",
        releasedYear: 2010,
        genres: ["Action", "Sci-Fi", "Thriller"],
        runtime: 148,
        posterUrl: "https://image.tmdb.org/t/p/w500/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg",
        createdBy: userId,
    },
    {
        title: "Interstellar",
        overview: "A group of astronauts travels through a wormhole in search of a new home for humanity.",
        releasedYear: 2014,
        genres: ["Adventure", "Drama", "Sci-Fi"],
        runtime: 169,
        posterUrl: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
        createdBy: userId,
    },
    {
        title: "The Dark Knight",
        overview: "Batman faces a criminal mastermind who plunges Gotham City into chaos and tests the limits of the hero's morality.",
        releasedYear: 2008,
        genres: ["Action", "Crime", "Drama"],
        runtime: 152,
        posterUrl: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
        createdBy: userId,
    },
    {
        title: "The Shawshank Redemption",
        overview: "A banker sentenced to life in prison forms an unlikely friendship while holding onto hope for freedom.",
        releasedYear: 1994,
        genres: ["Drama"],
        runtime: 142,
        posterUrl: "https://image.tmdb.org/t/p/w500/9cqNxx0GxF0bflZmeSMuL5tnGzr.jpg",
        createdBy: userId,
    },
    {
        title: "Parasite",
        overview: "A struggling family slowly becomes involved with a wealthy household, leading to unexpected and dangerous consequences.",
        releasedYear: 2019,
        genres: ["Drama", "Thriller"],
        runtime: 132,
        posterUrl: "https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg",
        createdBy: userId,
    },
    {
        title: "Avengers: Endgame",
        overview: "The remaining Avengers attempt to undo the devastating consequences of Thanos' actions.",
        releasedYear: 2019,
        genres: ["Action", "Adventure", "Sci-Fi"],
        runtime: 181,
        posterUrl: "https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg",
        createdBy: userId,
    },
    {
        title: "The Matrix",
        overview: "A computer hacker discovers that reality is a simulated world controlled by intelligent machines.",
        releasedYear: 1999,
        genres: ["Action", "Sci-Fi"],
        runtime: 136,
        posterUrl: "https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
        createdBy: userId,
    },
    {
        title: "Whiplash",
        overview: "An ambitious young drummer pushes himself to the limit under the demanding guidance of an intense music instructor.",
        releasedYear: 2014,
        genres: ["Drama", "Music"],
        runtime: 106,
        posterUrl: "https://image.tmdb.org/t/p/w500/7fn624j5lj3xTme2SgiLCeNOVIE.jpg",
        createdBy: userId,
    },
    {
        title: "Spider-Man: Into the Spider-Verse",
        overview: "A teenager becomes Spider-Man and encounters heroes from different dimensions.",
        releasedYear: 2018,
        genres: ["Animation", "Action", "Adventure"],
        runtime: 117,
        posterUrl: "https://image.tmdb.org/t/p/w500/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg",
        createdBy: userId,
    },
    {
        title: "Dune: Part Two",
        overview: "Paul Atreides joins the Fremen while seeking revenge and preparing for a conflict that could determine the fate of the galaxy.",
        releasedYear: 2024,
        genres: ["Action", "Adventure", "Sci-Fi"],
        runtime: 166,
        posterUrl: "https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg",
        createdBy: userId,
    },
];

const main = async () => {
    console.log("Seeding Movies...");
    for (const movie of movies) {
        await db.orm.public.Movie.create(movie);
        console.log(`Seeding movie: ${movie.title}`);
    }
    console.log("Seeding Completed");
}

main().catch((err) => {
    console.log(err);
    process.exit(1);
}).finally(async () => await disconnectDB())