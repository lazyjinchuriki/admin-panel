import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import { withSwal } from "react-sweetalert2";

function Categories({ swal }) {
  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);
  const [parentCategory, setParentCategory] = useState("");
  const [editedCategory, setEditedCategory] = useState(null);
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  function fetchCategories() {
    axios.get("/api/categories").then((res) => {
      setCategories(res.data);
    });
  }

  async function saveCategory(e) {
    e.preventDefault();
    const data = { name };

    if (parentCategory) {
      data.parentCategory = parentCategory;
    }
    if (properties.length > 0) {
      data.properties = properties.map((property) => {
        return {
          name: property.name,
          values: property.values.split(","),
        };
      });
    }

    if (editedCategory) {
      await axios.put("/api/categories", { ...data, _id: editedCategory._id });
      setEditedCategory(null);
    } else {
      await axios.post("/api/categories", data);
    }

    setName("");
    setParentCategory("");
    setProperties([]);
    fetchCategories();
  }

  async function editCategory(category) {
    setEditedCategory(category);
    setName(category.name);
    setParentCategory(category.parent?._id);
    setProperties(
      category.properties.map(({ name, values }) => {
        return {
          name,
          values: values.join(","),
        };
      })
    );
  }

  async function deleteCategory(category) {
    swal
      .fire({
        title: "Are you sure?",
        text: `Do you really want to delete ${category.name}?`,
        icon: "warning",
        confirmButtonText: "Yes, delete it!",
        confirmButtonColor: "#d33",
        reverseButtons: true,
        dangerMode: true,
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          const { _id } = category;
          await axios.delete("/api/categories/?_id=" + _id);
          fetchCategories();
        }
      });
  }

  function addProperty() {
    setProperties((prev) => {
      return [...prev, { name: "", values: "" }];
    });
  }
  function handlePropertyNameChange(index, property, newName) {
    // console.log({ index, property, newName });
    setProperties((prev) => {
      const properties = [...prev];
      properties[index].name = newName;
      return properties;
    });
  }

  function handlePropertyValueChange(index, property, newValue) {
    // console.log({ index, property, newValue });
    setProperties((prev) => {
      const properties = [...prev];
      properties[index].values = newValue;
      return properties;
    });
  }
  function removeProperty(indexToRemove) {
    setProperties((prev) => {
      return prev.filter((_, index) => index !== indexToRemove);
    });
  }

  return (
    <Layout>
      <h1>Categories</h1>
      <label>
        {editedCategory
          ? `Edit Category ${editedCategory.name}`
          : "New Category"}
      </label>
      <form onSubmit={saveCategory}>
        <div className="flex gap-2 mb-4 mx-1">
          <input
            className="mb-0"
            type="text"
            placeholder={"Name"}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <select
            className="mb-0"
            value={parentCategory}
            onChange={(e) => setParentCategory(e.target.value)}
          >
            <option value="">No Parent</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Properties</label>
          <button
            type="button"
            className=" border-2 border-blue-500  hover:bg-blue-500 rounded-full p-2 flex w-min mb-6"
            onClick={addProperty}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 "
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          </button>
          {properties.length > 0 &&
            properties.map((property, index) => (
              <div key={index} className="flex gap-2 mb-4 mx-1">
                <input
                  className="mb-0"
                  type="text"
                  placeholder={"Name"}
                  value={property.name}
                  onChange={(e) => {
                    handlePropertyNameChange(index, property, e.target.value);
                  }}
                />
                <input
                  className="mb-0"
                  type="text"
                  placeholder={"Value"}
                  value={property.values}
                  onChange={(e) => {
                    handlePropertyValueChange(index, property, e.target.value);
                  }}
                />
                <button
                  type="button"
                  onClick={() => removeProperty(index)}
                  className="  bg-red-200 p-4 rounded-xl text-red-950 hover:bg-red-300"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            ))}
        </div>
        <div className="flex gap-3">
          <button
            className=" bg-blue-200 flex p-4 mb-4 font-bold rounded-lg text-blue-950 hover:bg-blue-300 "
            type="submit"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 12.75l6 6 9-13.5"
              />
            </svg>
            <span>Save</span>
          </button>
          {editedCategory && (
            <button
              className=" bg-red-200 p-4 mb-4 font-bold rounded-lg text-red-950 hover:bg-red-300"
              type="button"
              onClick={() => {
                setEditedCategory(null);
                setName("");
                setParentCategory("");
                setProperties([]);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </div>
      </form>
      {!editedCategory && (
        <table className="w-full shadow-lg">
          <thead>
            <tr>
              <th className="border border-blue-600 p-4">Name</th>
              <th className="border border-blue-600">Parent</th>
              <th className="border border-blue-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category._id}>
                <td className="border border-blue-600 p-3">{category.name}</td>
                <td className="border border-blue-600 p-3">
                  {category.parent?.name}
                </td>

                <td className="border border-blue-600 p-3 text-center">
                  <button
                    className=" text-white font-bold rounded-lg"
                    onClick={() => editCategory(category)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5 mr-2 text-blue-700"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                      />
                    </svg>
                  </button>
                  <button
                    className="  text-white font-bold rounded-lg"
                    onClick={() => deleteCategory(category)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5 text-red-700"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                      />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </Layout>
  );
}

export default withSwal(({ swal }, ref) => <Categories swal={swal} />);
