# ToDos #

# ID validation #

The MongoDB IDs are expected to consist of 24 Hex characters.
On some pages the IDs are passed as url parameter. In this cases
the IDs should be properly validated, otherwise an exception might
be thrown from the MongoDB layer.

# ID comparison #

Some referencing IDs in the database are stored as ObjectID object, 
others are saved as strings. When it comes to comparing (in MongoDB 
queries) there is a difference between the object and the string 
version.

Perhaps it is a good idea to unify the storage of IDs.