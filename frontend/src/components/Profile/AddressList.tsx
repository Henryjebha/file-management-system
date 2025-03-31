import React, { useState } from 'react';
import { Address } from '../../types/user.types';
import { deleteAddress } from '../../services/user.service';
import AddressForm from './AddressForm';

interface AddressListProps {
  addresses: Address[];
  onUpdate: () => void;
}

const AddressList: React.FC<AddressListProps> = ({ addresses, onUpdate }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this address?')) {
      try {
        await deleteAddress(id);
        onUpdate();
      } catch (err) {
        console.error('Failed to delete address:', err);
      }
    }
  };

  const handleEdit = (address: Address) => {
    setEditingAddress(address);
    setShowAddForm(true);
  };

  const handleAddressSubmitted = () => {
    setShowAddForm(false);
    setEditingAddress(null);
    onUpdate();
  };

  return (
    <div>
      {addresses.length === 0 && !showAddForm ? (
        <div className="text-center py-4 text-gray-500">No addresses added yet</div>
      ) : (
        <div className="mb-6">
          {addresses.map((address) => (
            <div key={address.id} className="border p-4 mb-4 rounded-md">
              <div className="flex justify-between">
                <div>
                  <p className="font-semibold">{address.street}</p>
                  <p>{address.city}, {address.state} {address.postal_code}</p>
                  <p>{address.country}</p>
                  {address.is_default && (
                    <span className="inline-block mt-2 bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                      Default
                    </span>
                  )}
                </div>
                <div>
                  <button
                    onClick={() => handleEdit(address)}
                    className="text-blue-500 hover:text-blue-700 mr-3"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => address.id && handleDelete(address.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showAddForm ? (
        <AddressForm
          address={editingAddress}
          onSubmitted={handleAddressSubmitted}
          onCancel={() => {
            setShowAddForm(false);
            setEditingAddress(null);
          }}
        />
      ) : (
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Add New Address
        </button>
      )}
    </div>
  );
};

export default AddressList;