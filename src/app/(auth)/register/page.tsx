// src/app/(auth)/register/page.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  EyeIcon,
  EyeSlashIcon,
  EnvelopeIcon,
  LockClosedIcon,
  UserIcon,
  PhoneIcon,
  HeartIcon,
  CheckCircleIcon,
  DocumentArrowUpIcon,
  BuildingOfficeIcon,
} from "@heroicons/react/24/outline";
import { useAuth } from '@/hooks/use-auth';
import { isValidEmail, isValidPhone } from "@/lib/utils";
import toast from "react-hot-toast";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    role: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    terms: false,

    // business-only fields
    dd214File: null as File | null,
    businessName: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { register, user } = useAuth();
  const router = useRouter();

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user, router]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // First name validation
    if (!formData.first_name.trim()) {
      newErrors.first_name = "First name is required";
    } else if (formData.first_name.trim().length < 2) {
      newErrors.first_name = "First name must be at least 2 characters";
    }

    // Last name validation
    if (!formData.last_name.trim()) {
      newErrors.last_name = "Last name is required";
    } else if (formData.last_name.trim().length < 2) {
      newErrors.last_name = "Last name must be at least 2 characters";
    }

    if (!formData.role.trim()) {
      newErrors.role = "Role is required";
    }

    if (formData.role.trim() === "business" && !formData.dd214File) {
      newErrors.dd214File = "DD214 document upload is required";
    }

    if (formData.role.trim() === "business" && !formData.businessName.trim()) {
      newErrors.businessName = "Business name is required";
    }

    // Email validation
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Phone validation (optional but validate if provided)
    if (formData.phone && !isValidPhone(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password =
        "Password must contain at least one uppercase letter, one lowercase letter, and one number";
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    // Terms validation
    if (!formData.terms) {
      newErrors.terms = "You must agree to the terms and conditions";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      console.log('❌ Form validation failed', errors);
      return;
    }

    setIsLoading(true);

    // Map role values to match backend expectations
    const roleMapping: Record<string, string> = {
      'admin': 'admin',
      'customer': 'customer', 
      'business': 'business_owner'
    };

    // Prepare the data to send
    const registrationData = {
      first_name: formData.first_name.trim(),
      last_name: formData.last_name.trim(),
      email: formData.email.trim().toLowerCase(),
      phone: formData.phone.trim() || undefined,
      password: formData.password,
      role: roleMapping[formData.role] || formData.role,
      ...(formData.role === 'business' && {
        dd214File: formData.dd214File,
        businessName: formData.businessName.trim(),
      })
    };

    console.log('🚀 Submitting registration with data:', registrationData);

    try {
      const success = await register(registrationData);

      if (success) {
        console.log('✅ Registration successful, redirecting...');
        router.push("/");
      } else {
        console.log('❌ Registration failed but no exception thrown');
      }
    } catch (error: any) {
      console.error('🔥 Unexpected registration error:', error);
      toast.error("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string | boolean | File | null) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type and size
      const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];
      const maxSize = 5 * 1024 * 1024; // 5MB

      if (!allowedTypes.includes(file.type)) {
        setErrors((prev) => ({ 
          ...prev, 
          dd214File: "Please upload a PDF, JPG, or PNG file" 
        }));
        return;
      }

      if (file.size > maxSize) {
        setErrors((prev) => ({ 
          ...prev, 
          dd214File: "File size must be less than 5MB" 
        }));
        return;
      }

      handleInputChange("dd214File", file);
    }
  };

  const getPasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (/[a-z]/.test(password)) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/\d/.test(password)) strength += 25;
    return strength;
  };

  const passwordStrength = getPasswordStrength(formData.password);

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Hero Image/Content */}
      <div className="hidden lg:block relative w-0 flex-1">
        <div className="absolute inset-0 h-full w-full bg-gradient-to-br from-military-600 via-primary-600 to-veteran-700">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative h-full flex items-center justify-center p-12">
            <div className="text-center text-white max-w-lg">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h1 className="text-4xl font-bold font-heading mb-6">
                  Join The List
                </h1>
                <p className="text-xl text-gray-200 mb-8">
                  Whether you're looking for services or own a veteran business,
                  join thousands who are supporting our military community.
                </p>
                <div className="space-y-4 text-left">
                  {[
                    "Connect with verified veteran-owned businesses",
                    "Support military families and their enterprises",
                    "Access quality services from trusted providers",
                    "Join a community that honors service",
                  ].map((benefit, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      className="flex items-center space-x-3"
                    >
                      <CheckCircleIcon className="h-5 w-5 text-green-400 flex-shrink-0" />
                      <span className="text-gray-200">{benefit}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2 mb-8">
              <div className="flex items-center justify-center w-10 h-10 jodis-gradient rounded-lg">
                <HeartIcon className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold font-heading jodis-gradient-text">
                Jodi's List
              </span>
            </Link>

            {/* Header */}
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 font-heading">
                Create your account
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                Join our community and start connecting today
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Fields */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="first_name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    First name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <UserIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="first_name"
                      type="text"
                      autoComplete="given-name"
                      value={formData.first_name}
                      onChange={(e) =>
                        handleInputChange("first_name", e.target.value)
                      }
                      className={`form-input pl-10 ${
                        errors.first_name
                          ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                          : ""
                      }`}
                      placeholder="John"
                    />
                  </div>
                  {errors.first_name && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.first_name}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="last_name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Last name
                  </label>
                  <input
                    id="last_name"
                    type="text"
                    autoComplete="family-name"
                    value={formData.last_name}
                    onChange={(e) =>
                      handleInputChange("last_name", e.target.value)
                    }
                    className={`form-input ${
                      errors.last_name
                        ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                        : ""
                    }`}
                    placeholder="Smith"
                  />
                  {errors.last_name && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.last_name}
                    </p>
                  )}
                </div>
              </div>

              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <EnvelopeIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className={`form-input pl-10 ${
                      errors.email
                        ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                        : ""
                    }`}
                    placeholder="john@example.com"
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
              </div>

              {/* Role Field */}
              <div>
                <label
                  htmlFor="role"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Account Role
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <UserIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <select
                    id="role"
                    value={formData.role}
                    onChange={(e) => handleInputChange("role", e.target.value)}
                    className={`form-select pl-10 ${
                      errors.role
                        ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                        : ""
                    }`}
                  >
                    <option value="">Select Role</option>
                    {/* <option value="admin">Admin</option> */}
                    <option value="customer">Customer</option>
                    <option value="business">Business Owner</option>
                  </select>
                </div>
                {errors.role && (
                  <p className="mt-1 text-sm text-red-600">{errors.role}</p>
                )}
              </div>

              {/* Business-specific Fields */}
              {formData.role === "business" && (
                <>
                  {/* DD214 File Upload */}
                  <div>
                    <label
                      htmlFor="dd214-upload"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      DD214 Document Upload (Military Verification)
                    </label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md hover:border-gray-400 transition-colors">
                      <div className="space-y-1 text-center">
                        <DocumentArrowUpIcon className="mx-auto h-12 w-12 text-gray-400" />
                        <div className="flex text-sm text-gray-600">
                          <label
                            htmlFor="dd214-upload"
                            className="relative cursor-pointer bg-white rounded-md font-medium text-primary-600 hover:text-primary-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500"
                          >
                            <span>Upload DD214 document</span>
                            <input
                              id="dd214-upload"
                              name="dd214-upload"
                              type="file"
                              className="sr-only"
                              accept=".pdf,.jpg,.jpeg,.png"
                              onChange={handleFileUpload}
                            />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">
                          PDF, PNG, JPG up to 5MB
                        </p>
                        {formData.dd214File && (
                          <p className="text-sm text-green-600 mt-2">
                            ✓ {formData.dd214File.name}
                          </p>
                        )}
                      </div>
                    </div>
                    {errors.dd214File && (
                      <p className="mt-1 text-sm text-red-600">{errors.dd214File}</p>
                    )}
                  </div>

                  {/* Business Name */}
                  <div>
                    <label
                      htmlFor="business-name"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Business Name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <BuildingOfficeIcon className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="business-name"
                        type="text"
                        value={formData.businessName}
                        onChange={(e) =>
                          handleInputChange("businessName", e.target.value)
                        }
                        className={`form-input pl-10 ${
                          errors.businessName
                            ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                            : ""
                        }`}
                        placeholder="Enter Business Name"
                      />
                    </div>
                    {errors.businessName && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.businessName}
                      </p>
                    )}
                  </div>
                </>
              )}

              {/* Phone Field */}
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Phone number <span className="text-gray-500">(optional)</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <PhoneIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="phone"
                    type="tel"
                    autoComplete="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className={`form-input pl-10 ${
                      errors.phone
                        ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                        : ""
                    }`}
                    placeholder="(555) 123-4567"
                  />
                </div>
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                )}
              </div>

              {/* Password Field */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Password
                </label>
                
                {/* Password Requirements - Always Visible */}
                <div className="mb-3 p-3 bg-gray-50 rounded-lg border">
                  <p className="text-xs font-medium text-gray-700 mb-2">Password must contain:</p>
                  <div className="space-y-1 text-xs">
                    <div className={`flex items-center space-x-2 ${
                      formData.password.length >= 8 ? 'text-green-600' : 'text-gray-500'
                    }`}>
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                        formData.password.length >= 8 
                          ? 'bg-green-500 border-green-500' 
                          : 'border-gray-300'
                      }`}>
                        {formData.password.length >= 8 && (
                          <CheckCircleIcon className="w-3 h-3 text-white" />
                        )}
                      </div>
                      <span>At least 8 characters</span>
                    </div>
                    <div className={`flex items-center space-x-2 ${
                      /[a-z]/.test(formData.password) ? 'text-green-600' : 'text-gray-500'
                    }`}>
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                        /[a-z]/.test(formData.password) 
                          ? 'bg-green-500 border-green-500' 
                          : 'border-gray-300'
                      }`}>
                        {/[a-z]/.test(formData.password) && (
                          <CheckCircleIcon className="w-3 h-3 text-white" />
                        )}
                      </div>
                      <span>One lowercase letter</span>
                    </div>
                    <div className={`flex items-center space-x-2 ${
                      /[A-Z]/.test(formData.password) ? 'text-green-600' : 'text-gray-500'
                    }`}>
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                        /[A-Z]/.test(formData.password) 
                          ? 'bg-green-500 border-green-500' 
                          : 'border-gray-300'
                      }`}>
                        {/[A-Z]/.test(formData.password) && (
                          <CheckCircleIcon className="w-3 h-3 text-white" />
                        )}
                      </div>
                      <span>One uppercase letter</span>
                    </div>
                    <div className={`flex items-center space-x-2 ${
                      /\d/.test(formData.password) ? 'text-green-600' : 'text-gray-500'
                    }`}>
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                        /\d/.test(formData.password) 
                          ? 'bg-green-500 border-green-500' 
                          : 'border-gray-300'
                      }`}>
                        {/\d/.test(formData.password) && (
                          <CheckCircleIcon className="w-3 h-3 text-white" />
                        )}
                      </div>
                      <span>One number</span>
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <LockClosedIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    value={formData.password}
                    onChange={(e) =>
                      handleInputChange("password", e.target.value)
                    }
                    className={`form-input pl-10 pr-10 ${
                      errors.password
                        ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                        : ""
                    }`}
                    placeholder="Create a strong password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword ? (
                      <EyeSlashIcon className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    ) : (
                      <EyeIcon className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    )}
                  </button>
                </div>
                
                {/* Password Strength Indicator */}
                {formData.password && (
                  <div className="mt-2">
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-all duration-300 ${
                            passwordStrength < 50
                              ? "bg-red-500"
                              : passwordStrength < 75
                              ? "bg-yellow-500"
                              : "bg-green-500"
                          }`}
                          style={{ width: `${passwordStrength}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-500">
                        {passwordStrength < 50
                          ? "Weak"
                          : passwordStrength < 75
                          ? "Good"
                          : "Strong"}
                      </span>
                    </div>
                  </div>
                )}
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                )}
              </div>

              {/* Confirm Password Field */}
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Confirm password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <LockClosedIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    autoComplete="new-password"
                    value={formData.confirmPassword}
                    onChange={(e) =>
                      handleInputChange("confirmPassword", e.target.value)
                    }
                    className={`form-input pl-10 pr-10 ${
                      errors.confirmPassword
                        ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                        : ""
                    }`}
                    placeholder="Confirm your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showConfirmPassword ? (
                      <EyeSlashIcon className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    ) : (
                      <EyeIcon className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              {/* Terms and Conditions */}
              <div>
                <div className="flex items-start">
                  <input
                    id="terms"
                    type="checkbox"
                    checked={formData.terms}
                    onChange={(e) =>
                      handleInputChange("terms", e.target.checked)
                    }
                    className={`form-checkbox mt-1 ${
                      errors.terms
                        ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                        : ""
                    }`}
                  />
                  <label
                    htmlFor="terms"
                    className="ml-2 block text-sm text-gray-700"
                  >
                    I agree to the{" "}
                    <Link
                      href="/terms"
                      className="text-primary-600 hover:text-primary-500"
                    >
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link
                      href="/privacy"
                      className="text-primary-600 hover:text-primary-500"
                    >
                      Privacy Policy
                    </Link>
                  </label>
                </div>
                {errors.terms && (
                  <p className="mt-1 text-sm text-red-600">{errors.terms}</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full btn-primary py-3 text-base font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Creating account...
                  </div>
                ) : (
                  "Create account"
                )}
              </button>
            </form>

            {/* Sign in link */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="font-medium text-primary-600 hover:text-primary-500 transition-colors duration-200"
                >
                  Sign in here
                </Link>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}