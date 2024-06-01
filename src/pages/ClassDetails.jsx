import { useState } from "react";
import { Box, Text, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useClasses, useClassStudents, useAddClassStudent } from "../integrations/supabase/index.js";

const ClassDetails = () => {
  const { classId } = useParams();
  const { data: classes = [] } = useClasses();
  const { data: classStudents = [], refetch } = useClassStudents();
  const addClassStudentMutation = useAddClassStudent();
  const classDetails = classes.find(cls => cls.id === parseInt(classId, 10));
  
  const [studentName, setStudentName] = useState("");

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const addStudent = async () => {
    const student = { name: studentName, class_id: classDetails.id };
    await addClassStudentMutation.mutateAsync(student);
    
    setStudentName("");
    refetch();
  };

  return (
    <Box p={4}>
      <Text fontSize="3xl" fontWeight="bold">{classDetails?.name}</Text>
      <Text fontSize="xl">{classDetails?.description}</Text>
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
        {classStudents.filter(cs => cs.class_id === classDetails?.id).map((student, index) => (
          <Box key={index} p={2} borderWidth={1} borderRadius="md" mb={2}>
            <Text fontSize="lg">{student.name}</Text>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default ClassDetails;