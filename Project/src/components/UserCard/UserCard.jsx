import "./usercard.css";

const UserCard = ({ name, age, sport }) => {
  return (
    <div className="usercard">
      <div className="card">
        <h1>
          <span>Name : </span>
          {name}
        </h1>
      </div>
      <div className="card">
        <h1>
          <span>Age : </span>
          {age}
        </h1>
      </div>
      <div className="card">
        <h1>
          <span>Faviourate Sport : </span>
          {sport}
        </h1>
      </div>
    </div>
  );
};
export default UserCard;
