import apiClient from "./client";

/** Public: submit a contact/enquiry form. */
export async function submitEnquiry(enquiryData) {
  const { data } = await apiClient.post("/enquiries", enquiryData);
  return data;
}

/** Admin-only: fetch all enquiries (requires authenticated session). */
export async function fetchEnquiries() {
  const { data } = await apiClient.get("/admin/enquiries");
  return data.data;
}
