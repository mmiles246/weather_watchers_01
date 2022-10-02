# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

puts "Starting seeding......."

CommentLike.destroy_all
PostLike.destroy_all
Comment.destroy_all
Post.destroy_all
User.destroy_all
Location.destroy_all

puts "Previous Data Removes........"

puts "Seeding New Data......."

puts "Seeding Locations......"

loc1=Location.create(
    place_id: "ChIJkcxLDJ8uwokR8HKvyNgi7ZQ",
    name: "Asbury Park, NJ 07712, USA"
)

puts "Seeding Users......"

User.create(
    username:"user1",
    email:"user1@gmail.com",
    bio:"Random info about this user....",
    password: "test",
    location_id: loc1.id
)

puts "Seeding Complete!"