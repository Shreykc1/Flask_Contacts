import React from "react";

const ContactList = ({ contacts, updateContact, updateCallback }) => {
  const onDelete = async (id) => {
    try {
      const options = {
        method: "DELETE"
      };
      const response = await fetch(`http://127.0.0.1:5000/delete_contact/${id}`, options);
      if (response.status === 200) {
        updateCallback();
      } else {
        console.error("Failed to delete");
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mt-8">
        <div className="flex flex-col">
          <h2 className="text-6xl font-bold mb-7">Contacts</h2>
          <div className="w-full max-w-4xl">
            <table className="min-w-full divide-y divide-gray-200  shadow-2xl">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">First Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {contacts.map((contact) => (
                  <tr key={contact.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{contact.firstName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{contact.lastName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{contact.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm space-x-3">
                      <button onClick={() => updateContact(contact)} className="border-2 hover:border-black/50 text-black/70  font-bold py-2 px-4 rounded">Update</button>
                      <button onClick={() => onDelete(contact.id)} className="border-2 hover:border-black/50 text-black/70 font-bold py-2 px-4 rounded">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};


export default ContactList;
