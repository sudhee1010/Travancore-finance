/**
 * Enquiries list/table for the admin dashboard.
 * Renders as a normal table on wider screens; below 640px each row
 * collapses into a stacked card (see AdminDashboard.jsx's `.enquiries-table`
 * responsive rules) using the `data-label` attributes on each cell.
 */
function Enquiries({ enquiries = [] }) {
  if (enquiries.length === 0) {
    return <p className="enquiries-empty">No enquiries yet.</p>;
  }

  return (
    <div className="enquiries-table-wrap">
      <table className="enquiries-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Subject</th>
            <th>Message</th>
            <th>Submitted</th>
          </tr>
        </thead>
        <tbody>
          {enquiries.map((enquiry) => (
            <tr key={enquiry._id}>
              <td data-label="Name">{enquiry.name}</td>
              <td data-label="Phone">{enquiry.phone}</td>
              <td data-label="Email">{enquiry.email}</td>
              <td data-label="Subject">{enquiry.subject}</td>
              <td data-label="Message">{enquiry.message}</td>
              <td data-label="Submitted">{new Date(enquiry.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Enquiries;