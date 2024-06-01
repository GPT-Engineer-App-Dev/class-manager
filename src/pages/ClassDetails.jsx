import { useState } from "react";
import { Box, Text, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useClassStudents, useAddClassStudent } from "../integrations/supabase/index.js";

const ClassDetails = () => {
  const { classId } = useParams();
  const { data: classStudents = [], refetch } = useClassStudents();
  const addClassStudentMutation = useAddClassStudent();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [studentName, setStudentName] = useState("");

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const addStudent = async () => {
    await addClassStudentMutation.mutateAsync({ class_id: classId, student_id: studentName });
    setStudentName("");
    closeModal();
  };

  return (
    <Box p={4}>
      <Text fontSize="3xl" fontWeight="bold">Class Details</Text>
      <Button colorScheme="blue" onClick={openModal} mt={4}>Add Student</Button>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Student</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Student Name</FormLabel>
              <Input 
                placeholder="Enter student name" 
                value={studentName} 
                onChange={(e) => setStudentName(e.target.value)} 
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
        <Text fontSize="2xl" fontWeight="bold">Students</Text>
        {classStudents.filter(cs => cs.class_id === parseInt(classId)).map((student, index) => (
          <Box key={index} p={2} borderWidth={1} borderRadius="md" mb={2}>
            <Text fontSize="lg">{student.student_id}</Text>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default ClassDetails;