# Back-end

1. Register.
    1. Admin (must be created by other Admin)
    2. User. (Must be confirm later by admin)
    3. Hospital (must have correct ID from Finnish)
2. Login
    1. POST:By password vs username
        1. Get 1 day valid TOKEN
3. Hospital information 
    1. GET : Name, location, campus, 
    2. GET: Time booking table for each campus
        1. Only user can book
        2. Book only accept by hospital
    3. POST: Confirm request booking from user
4. User information 
    1. GET : Name, age, address….
    2. POST : Booking history
    3. PATCH :Booking 
    4. PATCH: edit information
5. Admin information 
    1. Confirm request from (user register)
    2. Delete user/hospital 


