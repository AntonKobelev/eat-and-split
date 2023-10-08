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
  return (
    <div className="app">
      <FriendsList />
    </div>
  );
}

function FriendsList() {
  const friends = initialFriends;
  return (
    <div className="sidebar">
      <ul>
        {friends.map((friend) => (
          <li key={friend.id}>
            <h3>{friend.name}</h3>
            <img src={friend.image} alt={friend.id}></img>
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
            <button className="button">Select</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
