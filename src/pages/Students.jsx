import { Box, Text } from "@chakra-ui/react";
import { useStudents, useAddStudent } from '../integrations/supabase';

const Students = () => {
  const { data: students, isLoading, error } = useStudents();
  const addStudent = useAddStudent();
  const handleAddStudent = () => {
    addStudent.mutate({ first_name: studentDetails.first_name, last_name: studentDetails.last_name, email: studentDetails.email });
    setStudentDetails({ first_name: "", last_name: "", email: "" });
    closeModal();
  };

  return (
    <Box p={4}>
      <Text fontSize="3xl" fontWeight="bold">Students</Text>
      <Text fontSize="xl">Manage all your students here.</Text>
      {isLoading && <Text>Loading...</Text>}
      {error && <Text>Error loading students</Text>}
      {students && students.map(student => (
        <Box key={student.id}>
          <Text>{student.first_name} {student.last_name}</Text>
          <Text>{student.email}</Text>
        </Box>
      ))}
    </Box>
  );
};

export default Students;