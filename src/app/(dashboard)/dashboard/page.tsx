"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  User,
  ShoppingBag,
  Heart,
  MessageCircle,
  Calendar,
  Settings,
  LogOut,
} from "lucide-react";
import { useAuthStore } from "@/stores/auth";
import { useCartStore } from "@/stores/cart";

interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  createdAt: string;
}

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

export default function DashboardPage() {
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuthStore();
  const {
    items: cartItems,
    removeItem,
    updateQuantity: updateItemQuantity,
    clearCart,
  } = useCartStore();

  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState(
    searchParams?.get("tab") || "profile"
  );
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }

    fetchUserProfile();
  }, [isAuthenticated, router]);

  const fetchUserProfile = async () => {
    try {
      // ✅ Get token from localStorage (where it actually is!)
      const token = localStorage.getItem("token");

      const response = await fetch("/api/user/profile", {
        credentials: "include",
        headers: {
          Authorization: `Bearer ${token}`, // ✅ Send it in header
        },
      });

      if (response.ok) {
        const data = await response.json();
        setProfile(data);
      } else {
        console.error("Failed to fetch profile:", response.status);
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "cart", label: "My Cart", icon: ShoppingBag },
    { id: "wishlist", label: "Wishlist", icon: Heart },
    { id: "inquiries", label: "Inquiries", icon: MessageCircle },
    { id: "bookings", label: "Bookings", icon: Calendar },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">My Dashboard</h1>
              <p className="text-gray-600">
                Welcome back, {profile?.name || user?.name}!
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <nav className="space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                      activeTab === tab.id
                        ? "bg-primary-50 text-primary-700 border border-primary-200"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === "profile" && <ProfileTab profile={profile} />}
            {activeTab === "cart" && (
              <CartTab
                cartItems={cartItems}
                removeItem={removeItem}
                updateItemQuantity={updateItemQuantity}
                clearCart={clearCart}
              />
            )}
            {activeTab === "wishlist" && <WishlistTab />}
            {activeTab === "inquiries" && <InquiriesTab />}
            {activeTab === "bookings" && <BookingsTab />}
          </div>
        </div>
      </div>
    </div>
  );
}

// Profile Tab Component
function ProfileTab({ profile }: { profile: UserProfile | null }) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: profile?.name || "",
    email: profile?.email || "",
    phone: profile?.phone || "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement profile update
    setIsEditing(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">
          Profile Information
        </h2>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="text-primary-600 hover:text-primary-700 font-medium"
        >
          {isEditing ? "Cancel" : "Edit"}
        </button>
      </div>

      {isEditing ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
          <button
            type="submit"
            className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700"
          >
            Save Changes
          </button>
        </form>
      ) : (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <p className="text-gray-900">{profile?.name || "Not provided"}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <p className="text-gray-900">{profile?.email || "Not provided"}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Phone
            </label>
            <p className="text-gray-900">{profile?.phone || "Not provided"}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Member Since
            </label>
            <p className="text-gray-900">
              {profile?.createdAt
                ? new Date(profile.createdAt).toLocaleDateString()
                : "Unknown"}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

// Cart Tab Component
function CartTab({
  cartItems,
  removeItem,
  updateItemQuantity,
  clearCart,
}: {
  cartItems: CartItem[];
  removeItem: (id: string) => void;
  updateItemQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
}) {
  const total = (cartItems || []).reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6 text-center">
        <ShoppingBag className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Your cart is empty
        </h3>
        <p className="text-gray-600 mb-4">
          Start shopping to add items to your cart
        </p>
        <Link
          href="/products"
          className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">
          My Cart ({cartItems.length} items)
        </h2>
        <button
          onClick={clearCart}
          className="text-red-600 hover:text-red-700 font-medium"
        >
          Clear Cart
        </button>
      </div>

      <div className="space-y-4">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-16 h-16 object-cover rounded-lg"
            />
            <div className="flex-1">
              <h3 className="font-medium text-gray-900">{item.name}</h3>
              <p className="text-gray-600">₹{item.price.toLocaleString()}</p>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() =>
                  updateItemQuantity(item.productId, item.quantity - 1)
                }
                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
              >
                -
              </button>
              <span className="w-8 text-center">{item.quantity}</span>
              <button
                onClick={() =>
                  updateItemQuantity(item.productId, item.quantity + 1)
                }
                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
              >
                +
              </button>
            </div>
            <div className="text-right">
              <p className="font-medium text-gray-900">
                ₹{(item.price * item.quantity).toLocaleString()}
              </p>
              <button
                onClick={() => removeItem(item.productId)}
                className="text-red-600 hover:text-red-700 text-sm"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <span className="text-lg font-semibold text-gray-900">Total:</span>
          <span className="text-lg font-semibold text-gray-900">
            ₹{total.toLocaleString()}
          </span>
        </div>
        <div className="flex space-x-4">
          <Link
            href="/products"
            className="flex-1 text-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Continue Shopping
          </Link>
          <Link
            href={`/contact?cart=true`}
            className="flex-1 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 text-center"
          >
            Inquire About These Items
          </Link>
        </div>
      </div>
    </div>
  );
}

// Wishlist Tab Component
function WishlistTab() {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 text-center">
      <Heart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        Your wishlist is empty
      </h3>
      <p className="text-gray-600 mb-4">Save items you love for later</p>
      <Link
        href="/products"
        className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
      >
        Browse Products
      </Link>
    </div>
  );
}

// Inquiries Tab Component
function InquiriesTab() {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuthStore();

  useEffect(() => {
    fetchInquiries();
  }, []);

  const fetchInquiries = async () => {
    try {
      const response = await fetch("/api/contact/user", {
        credentials: "include",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setInquiries(data);
      }
    } catch (error) {
      console.error("Error fetching inquiries:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (inquiries.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6 text-center">
        <MessageCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          No inquiries yet
        </h3>
        <p className="text-gray-600 mb-4">
          Your product inquiries will appear here
        </p>
        <Link
          href="/products"
          className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">My Inquiries</h2>
      <div className="space-y-4">
        {inquiries.map((inquiry) => (
          <div
            key={inquiry.id}
            className="border border-gray-200 rounded-lg p-4"
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-medium text-gray-900">{inquiry.subject}</h3>
              <span
                className={`px-2 py-1 text-xs rounded-full ${
                  inquiry.status === "new"
                    ? "bg-blue-100 text-blue-800"
                    : inquiry.status === "responded"
                    ? "bg-green-100 text-green-800"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {inquiry.status}
              </span>
            </div>
            <p className="text-sm text-gray-600 mb-2">{inquiry.message}</p>
            <p className="text-xs text-gray-500">
              {new Date(inquiry.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

// Bookings Tab Component
function BookingsTab() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await fetch("/api/bookings/user", {
        credentials: "include",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setBookings(data.bookings || []);
      }
    } catch (error) {
      console.error("Error fetching bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (bookings.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6 text-center">
        <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          No bookings yet
        </h3>
        <p className="text-gray-600 mb-4">
          Your appointment bookings will appear here
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
        >
          Book Appointment
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">My Bookings</h2>
      <div className="space-y-4">
        {bookings.map((booking) => (
          <div
            key={booking.id}
            className="border border-gray-200 rounded-lg p-4"
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-medium text-gray-900">
                  {new Date(booking.date).toLocaleDateString()} at{" "}
                  {booking.time}
                </h3>
                <p className="text-sm text-gray-600">{booking.message}</p>
              </div>
              <span
                className={`px-2 py-1 text-xs rounded-full ${
                  booking.status === "pending"
                    ? "bg-yellow-100 text-yellow-800"
                    : booking.status === "confirmed"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {booking.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
