import { Button } from "@mui/material";
import Dexie from "dexie";
import { useRef } from "react";
export default function Dexed() {
  const DB = useRef(null);
  const handleCreateDB = () => {
    const db = new Dexie("myDatabase");
    db.version(1).stores({
      users: "++id, name, age",
      posts: "++id, title, content",
    });

    // db.open();
    DB.current = db;
  };

  const handleAddUser = async () => {
    await DB.current.users.add({ name: "Alice", email: "alice@example.com" });
    console.log("create OK");
  };

  const handleAddUsers = async () => {
    await DB.current.users.bulkAdd([
      { name: "Bob", email: "bob@example.com" },
      { name: "Charlie", email: "charlie@example.com" },
    ]);
    console.log("create OK");
  };

  const handleGetUsers = async () => {
    const users = await DB.current.users.toArray();
    console.log("users", users);
  };

  const handleGetById = async () => {
    const user = await DB.current.users.get(11); // id = 1
    console.log("userByid", user);
  };

  const handleFilter = async () => {
    const filtered = await DB.current.users
      .where("name")
      .equals("Alice")
      .toArray();
    console.log("filtered", filtered);
  };

  const handleUpdateOne = async () => {
    await DB.current.users.update(11, {
      email: "alice_new@example.com",
      name: "hungnguyen",
    });
    console.log("update OK");
  };

  const handleUpdateMany = async () => {
    await DB.current.users
      .where("name")
      .startsWith("A")
      .modify({ email: "new@example.com", name: "hungnguyen" });
    console.log("updates OK");
  };

  const handleDeleteOne = async () => {
    await DB.current.users.delete(11);
  };

  const handleDeleteMany = async () => {
    await DB.current.users.where("name").equals("hungnguyen").delete();
  };

  const handleClear = async () => {
    await DB.current.users.clear();
  };

  //   Transaction giúp nhiều thao tác chạy atomically, nếu 1 thao tác lỗi → rollback tất cả
  const handleTransaction = async () => {
    if (!DB.current) return console.error("DB not initialized!");

    await DB.current.transaction(
      "rw",
      DB.current.users,
      DB.current.posts,
      async () => {
        await DB.current.users.add({
          name: "David",
          email: "david@example.com",
        });
        await DB.current.posts.add({ title: "Hello", content: "Content here" });
      }
    );

    console.log("Transaction completed");
  };

  return (
    <div>
      Dexed:
      <Button onClick={handleCreateDB}>Create DB</Button>
      <Button onClick={handleAddUser}>Create User</Button>
      <Button onClick={handleAddUsers}>Create Users</Button>
      <Button onClick={handleGetUsers}>GEt all</Button>
      <Button onClick={handleFilter}>Filter</Button>
      <Button onClick={handleGetById}>Get By Id</Button>
      <Button onClick={handleUpdateOne}>Update One</Button>
      <Button onClick={handleUpdateMany}>Update Many</Button>
      <Button onClick={handleDeleteOne}>Delete One</Button>
      <Button onClick={handleDeleteMany}>Delete Many</Button>
      <Button onClick={handleClear}>Clear All</Button>
      <Button onClick={handleTransaction}>Transaction</Button>
    </div>
  );
}
