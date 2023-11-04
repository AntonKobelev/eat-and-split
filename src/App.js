import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

export default function App() {
  const [friends, setFriends] = useState(initialFriends);
  const [showFormAddFriend, setShowFormAddFriend] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState(null);

  function handlerClick() {
    setShowFormAddFriend((show) => !show);
    setSelectedFriend(null);
  }

  function handlerAddFriend(friend) {
    setFriends((friends) => [...friends, friend]);
    setShowFormAddFriend(false);
  }

  function handlerSelectedFriend(friend) {
    setSelectedFriend((cur) => (cur?.id === friend.id ? null : friend));
    setShowFormAddFriend(false);
  }

  function handleSplitBill(resultOfPay) {
    console.log(resultOfPay);
    setFriends(
      friends.map((friend) =>
        friend.id === selectedFriend.id
          ? { ...friend, balance: friend.balance + resultOfPay }
          : friend
      )
    );

    setSelectedFriend(false);
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList
          friends={friends}
          onHandlerSelectedFriend={handlerSelectedFriend}
          selectedFriend={selectedFriend}
        />
        {showFormAddFriend && (
          <FormAddFriend onHandlerAddFriens={handlerAddFriend} />
        )}
        <Button onClick={handlerClick}>
          {showFormAddFriend ? "Close" : "Add friend"}
        </Button>
      </div>
      {selectedFriend && (
        <FormSplitBill
          key={selectedFriend.id}
          selectedFriend={selectedFriend}
          onSplitBill={handleSplitBill}
        />
      )}
    </div>
  );
}

function FriendsList({ friends, onHandlerSelectedFriend, selectedFriend }) {
  return (
    <ul>
      {friends.map((friend) => (
        <Friend
          friend={friend}
          key={friend.id}
          onHandlerSelectedFriend={onHandlerSelectedFriend}
          selectedFriend={selectedFriend}
        />
      ))}
    </ul>
  );
}

function Friend({ friend, onHandlerSelectedFriend, selectedFriend }) {
  const isSelected = friend.id === selectedFriend?.id;
  return (
    <li className={isSelected ? "selected" : ""}>
      <h3>{friend.name}</h3>
      <img src={friend.image} alt={friend.name}></img>
      {friend.balance > 0 && (
        <p className="green">
          {friend.name} owes you {friend.balance}€
        </p>
      )}
      {friend.balance === 0 && <p>You and {friend.name} are even</p>}
      {friend.balance < 0 && (
        <p className="red">
          You owe {friend.name} {Math.abs(friend.balance)}€
        </p>
      )}
      <button
        className="button"
        onClick={() => onHandlerSelectedFriend(friend)}
      >
        {isSelected ? "Close" : "Select"}
      </button>
    </li>
  );
}

function FormAddFriend({ onHandlerAddFriens }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48");
  function handleSubmit(e) {
    const id = uuidv4();
    e.preventDefault();
    if (!name || !image) return;
    const newFriend = {
      id,
      name,
      image: `${image}?u=${id}`,
      balance: 0,
    };
    onHandlerAddFriens(newFriend);
    setName("");
    setImage("https://i.pravatar.cc/48");
  }

  return (
    <form className="form-add-friend" onSubmit={handleSubmit}>
      <label>👩🏻‍🤝‍🧑🏼Friend name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      ></input>
      <label>🖼️ Image URL</label>
      <input
        type="text"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      ></input>
      <Button>Add</Button>
    </form>
  );
}

function Button({ children, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}

function FormSplitBill({ selectedFriend, onSplitBill }) {
  const [bill, setBill] = useState("");
  const [paidByUser, setPaidByUser] = useState("");
  const [whoIsPaying, setWhoIsPaying] = useState("user");
  const payByFriend = bill ? bill - paidByUser : "";

  function handleSubmit(e) {
    e.preventDefault();
    if (bill === null || payByFriend === null) return;
    const resultOfPay = whoIsPaying === "user" ? -payByFriend : paidByUser;
    onSplitBill(resultOfPay);
  }

  return (
    <form className="form-split-bill">
      <h2>{`SPLIT A BILL WITH ${selectedFriend.name}`}</h2>
      <label>💰Bill value</label>
      <input
        type="text"
        value={bill}
        onChange={(e) => setBill(Number(e.target.value))}
      ></input>
      <label>🧒 Your expence</label>
      <input
        type="text"
        value={paidByUser}
        onChange={(e) =>
          setPaidByUser(
            Number(e.target.value) > bill ? paidByUser : Number(e.target.value)
          )
        }
      ></input>
      <label>{`👫 ${selectedFriend.name}'s expence`}</label>
      <input type="text" disabled value={payByFriend}></input>
      <label>🤑 Who is playnig the bill</label>
      <select
        value={whoIsPaying}
        onChange={(e) => setWhoIsPaying(e.target.value)}
      >
        <option value="user">You</option>
        <option value="friend">{selectedFriend.name}</option>
      </select>

      <Button onClick={handleSubmit}>Split bill</Button>
    </form>
  );
}
