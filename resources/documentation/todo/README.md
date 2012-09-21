# ToDos #

## ID validation ##

The MongoDB IDs are expected to consist of 24 Hex characters.
On some pages the IDs are passed as url parameter. In this cases
the IDs should be properly validated, otherwise an exception might
be thrown from the MongoDB layer.

## ID comparison ##

Some referencing IDs in the database are stored as ObjectID object, 
others are saved as strings. When it comes to comparing (in MongoDB 
queries) there is a difference between the object and the string 
version.

Perhaps it is a good idea to unify the storage of IDs.

## Testing with MongoDB connections ##

The unit tests of the access layer simulate MongoDB connections
to decouple the tests from a real database. The code of the mocked 
connections is always nearly the same, but it is copied to all tests.

It might be useful to create an additional class that is able to
mock most operations of the connection and that is reused in all
tests (just like util/testRequest and util/test/Response).