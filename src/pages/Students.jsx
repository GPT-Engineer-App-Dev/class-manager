import { Box, Text, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { useState } from "react";
import { useStudents, useAddStudent } from "../integrations/supabase/index.js";

const Students = () => {
  const { data: students = [], refetch } = useStudents();
  const addStudentMutation = useAddStudent();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [studentDetails, setStudentDetails] = useState({ first_name: "", last_name: "", email: "" });

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const addStudent = async () => {
    await addStudentMutation.mutateAsync(studentDetails);
    setStudentDetails({ first_name: "", last_name: "", email: "" });
    closeModal();
    refetch();
  };

  return (
    <Box p={4}>
      <Text fontSize="3xl" fontWeight="bold">Students</Text>
      <Text fontSize="xl">Manage all your students here.</Text>
      <Button colorScheme="blue" onClick={openModal} mt={4}>Add Student</Button>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Student</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>First Name</FormLabel>
              <Input 
                placeholder="Enter first name" 
                value={studentDetails.first_name} 
                onChange={(e) => setStudentDetails({ ...studentDetails, first_name: e.target.value })} 
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Last Name</FormLabel>
              <Input 
                placeholder="Enter last name" 
                value={studentDetails.last_name} 
                onChange={(e) => setStudentDetails({ ...studentDetails, last_name: e.target.value })} 
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Email</FormLabel>
              <Input 
                placeholder="Enter email" 
                value={studentDetails.email} 
                onChange={(e) => setStudentDetails({ ...studentDetails, email: e.target.value })} 
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button 
              colorScheme="blue" 
              mr={3} 
              onClick={addStudent}
            >
              Save
            </Button>
            <Button variant="ghost" onClick={closeModal}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Box mt={4}>
        {students.map((student) => (
          <Box key={student.id} p={2} borderWidth={1} borderRadius="md" mb={2}>
            <Text fontSize="lg" fontWeight="bold">{student.first_name} {student.last_name}</Text>
            <Text>{student.email}</Text>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Students;