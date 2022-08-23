import { Component } from "react";

import UserList from "./components/UserList";
import UserForm from "./components/UserForm";
import Filter from "./components/Filter";

import "./App.css";

const INITIAL_TIMER = 10;

const initalUsersState = [
  {
    id: "115d-aw",
    name: "John",
    email: "john@gmail.com",
    phone: "+3806964411212",
  },
];

class App extends Component {
  state = {
    editMode: {
      isEditing: false,
      user: null,
    },
    users: initalUsersState,
    filterTerm: "",
    currentTiming: 0,
    timerId: null,
  };

  addUser = (formData) => {
    const isNewUser = !this.state.editMode.isEditing; // false

    const newUser = {
      id: isNewUser
        ? Math.random().toFixed(2).toString()
        : this.state.editMode.user.id,
      ...formData,
    };

    console.log("newUser: ", newUser);

    if (this.state.editMode.isEditing) {
      const updatedUsers = this.state.users.map((user) =>
        user.id === newUser.id ? newUser : user
      );

      console.log("updatedUsers: ", updatedUsers);

      this.setState({ users: updatedUsers });
    } else {
      this.setState((prevState) => ({
        users: [...prevState.users, newUser],
      }));
    }

    this.setState({
      editMode: {
        isEditing: false,
        user: null,
      },
    });
  };

  removeUser = (userId) => {
    const newUsers = this.state.users.filter((user) => {
      return user.id !== userId;
    });

    // Фільтр в новий масив додасть всіх людей, чий айді
    // не буде співпадати з айді користувача, на я кого ми натиснули
    this.setState({ users: newUsers });
  };

  editUser = (userId) => {
    const userToEdit = this.state.users.find((user) => {
      return user.id === userId;
    });

    // console.log('userToEdit: ', userToEdit);

    // Фільтр в новий масив додасть всіх людей, чий айді
    // не буде співпадати з айді користувача, на я кого ми натиснули

    this.setState({
      editMode: {
        isEditing: true,
        user: userToEdit,
      },
    });
  };

  hanleFilterInput = ({ target: { value } }) => {
    this.setState({ filterTerm: value });
  };

  filterUsers = (array, filterTerm) => {
    // логика фільтації
    filterTerm = filterTerm.toLowerCase();

    return array.filter(
      (item) =>
        item.name.toLowerCase().includes(filterTerm) ||
        item.email.toLowerCase().includes(filterTerm) ||
        item.phone.toLowerCase().includes(filterTerm)
    );
  };

  handleIncrementTimer = () => {
    if (this.state.currentTiming === 10) {
      this.handleClearTimer();
    } else {
      this.setState((prevState) => ({
        currentTiming: prevState.currentTiming + 1,
      }));
    }
  };

  handleClearTimer = () => {
    clearInterval(this.state.timerId);
    this.setState({
      currentTiming: 0,
      editMode: {
        isEditing: false,
        user: null,
      },
    });
  };

  componentDidUpdate(_, prevState) {
    if (
      prevState.editMode.isEditing !== this.state.editMode.isEditing &&
      this.state.editMode.isEditing === true
    ) {
      const timerId = setInterval(() => this.handleIncrementTimer(), 1000);

      this.setState({ timerId });
    }

    if (
      prevState.editMode.isEditing !== this.state.editMode.isEditing &&
      this.state.editMode.isEditing === false
    ) {
      this.handleClearTimer();
    }
  }

  render() {
    const { editUser, removeUser, addUser, hanleFilterInput, filterUsers } =
      this;
    const { editMode, users, filterTerm, currentTiming } = this.state;

    const filteredUsers = filterUsers(users, filterTerm);

    return (
      <div className="App">
        <UserForm
          editMode={editMode}
          onSubmit={addUser}
          currentTiming={currentTiming}
          initialTimer={INITIAL_TIMER}
        />

        <Filter filterTerm={filterTerm} hanleFilterInput={hanleFilterInput} />

        <UserList
          users={filteredUsers}
          editUser={editUser}
          removeUser={removeUser}
        />
      </div>
    );
  }
}

export default App;
