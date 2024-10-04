function Club({ club }) {
  return (
    <div>
      <h1>{club.name}</h1>
      <p>{club.description}</p>
      <p>Established Year: {club.established_year}</p>
      <img src={club.logo} alt={club.name} />
      <p>Tags: {club.tags.join(', ')}</p>
      <p>Type: {club.type}</p>
      <p>Faculty In-charge: {club.faculty_incharge.map((faculty) => faculty.name).join(', ')}</p>
      <p>Events Conducted: {club.events_conducted.length} events</p>
      <p>Past Core Teams: {club.past_core_teams.length} teams</p>
    </div>
  );
}

export default Club;