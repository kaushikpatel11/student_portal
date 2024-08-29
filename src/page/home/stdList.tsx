import React, { useEffect, useState } from "react";

const StdList = () => {
  const [items, setItems] = useState<any>([]);

  const [isEdit, setIsEdit] = useState(false);
  const [selectedId, setSelectedId] = useState<number>(-1);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newItem, setNewItem] = useState({ name: "", age: "", email: "" });
  const [expandedItems, setExpandedItems] = useState<any>([]);

  const getAllStdData = () => {
    const requestOptions: any = {
      method: "GET",
      redirect: "follow",
    };

    fetch("https://freetestapi.com/api/v1/students?limit=10", requestOptions)
      .then((response) => response.text())
      .then((result: any) => {
        setItems(JSON.parse(result));
      })
      .catch((error) => console.error(error));
  };

  const addNewItem = () => {
    if (newItem?.name && newItem?.age && newItem?.email) {
      const tempData = [...items];

      tempData.push({
        id: items?.length + 1,
        name: newItem?.name,
        age: newItem?.age,
        email: newItem?.email,
      });
      setItems(tempData);
      closeModal();
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
    setIsEdit(false);
  };

  const openEditModal = (id: number) => {
    setIsModalOpen(true);
    setNewItem({
      name: items[id - 1]?.name,
      age: items[id - 1]?.age,
      email: items[id - 1]?.email,
    });
    setSelectedId(id);
    setIsEdit(true);
  };

  // Function to handle closing the modal
  const closeModal = () => {
    setIsModalOpen(false);
    setIsEdit(false);
    setNewItem({ name: "", age: "", email: "" });
  };

  // Function to handle editing an item
  const handleEdit = (id: number) => {
    const tempData = [...items];

    setItems(
      tempData.map((item: any) =>
        item.id === id
          ? {
              ...item,
              name: newItem?.name,
              age: newItem?.age,
              email: newItem?.email,
            }
          : item
      )
    );
    closeModal();
  };

  // Function to handle form submission
  const handleAddItem = (e: any) => {
    e.preventDefault();
    if (isEdit) {
      handleEdit(selectedId);
    } else {
      addNewItem();
    }
  };

  // Function to handle input change
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setNewItem((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleDelete = (id: number) => {
    setItems(items.filter((item: any) => item?.id !== id));
  };

  useEffect(() => {
    getAllStdData();
  }, []);

  const toggleMoreContent = (id: any) => {
    if (expandedItems.includes(id)) {
      setExpandedItems(expandedItems.filter((itemId: any) => itemId !== id));
    } else {
      setExpandedItems([...expandedItems, id]);
    }
  };

  return (
    <div>
      <div className="p-6">
        <h1 className="text-3xl font-bold text-center mb-8">Student Portal</h1>

        {/* Add Button */}
        <div className="flex justify-end mb-4">
          <button
            onClick={openModal}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Add Item
          </button>
        </div>

        {/* List Container */}
        {items?.length === 0 ? (
          <h2 className="text-xl font-semibold mb-1 text-center text-red-500">
            Student list not found
          </h2>
        ) : (
          <ul className="space-y-4">
            {items.map((item: any) => (
              <li key={item?.id} className="bg-white rounded-lg shadow-md p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-xl font-semibold mb-1">{item?.name}</h2>
                    <p className="text-gray-600">{item?.age}</p>
                    <p className="text-gray-600">{item?.email}</p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => openEditModal(item?.id)}
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item?.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </div>
                <div className="flex justify-end mt-2">
                  <button
                    onClick={() => toggleMoreContent(item.id)}
                    className="text-gray-700 hover:text-gray-900"
                  >
                    {expandedItems.includes(item.id)
                      ? "Show Less"
                      : "Show More"}
                  </button>
                </div>

                {/* More Content */}
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    expandedItems.includes(item.id)
                      ? "max-h-screen mt-4"
                      : "max-h-0"
                  }`}
                >
                  {expandedItems.includes(item.id) && (
                    <div className="bg-gray-100 p-4 rounded mt-2">
                      <h2 className="text-gray-700">
                        This is additional details for the "{item.name}".
                      </h2>
                      <p className="text-gray-600">
                        {item?.gender ? item?.gender : "Male"}
                      </p>
                      <p className="text-gray-600">
                        {item?.gpa ? item?.gpa : "2.0"}
                      </p>
                      <p className="text-gray-600">
                        {item?.phone ? item?.phone : "555-222-1234"}
                      </p>
                      <p className="text-gray-600">
                        {item?.address
                          ? item?.address?.street +
                            ", " +
                            item?.address?.city +
                            ", " +
                            item?.address?.country +
                            ", " +
                            item?.address?.zip
                          : "Cityville, USA, 123 Main Street, 12345"}
                      </p>
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div>
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold mb-4">
                  {isEdit ? " Edit A Item" : "Add New Item"}
                </h2>
                <div className="text-2xl font-bold mb-4" onClick={closeModal}>
                  ✕
                </div>
              </div>
              <form onSubmit={handleAddItem}>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="title"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={newItem.name}
                    onChange={handleChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="description"
                  >
                    Age
                  </label>
                  <input
                    type="number"
                    id="age"
                    name="age"
                    value={newItem.age}
                    onChange={handleChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="description"
                  >
                    Email
                  </label>
                  <input
                    type="text"
                    id="email"
                    name="email"
                    value={newItem.email}
                    onChange={handleChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                  >
                    {isEdit ? "Edit" : "Add"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StdList;
