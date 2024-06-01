import { useParams } from "react-router-dom";
import { Box, Text, Button, FormControl, FormLabel, Input, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from "@chakra-ui/react";
import { useState } from "react";

const ClassDetails = ({ classes, setClasses }) => {
  const { className } = useParams();
  const selectedClass = classes.find(cls => cls.name === className);
  const [studentName, setStudentName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddStudent = () => {
    const updatedClass = { ...selectedClass, students: [...selectedClass.students, studentName] };
    setClasses(classes.map(cls => cls.name === selectedClass.name ? updatedClass : cls));
    setStudentName("");
    setIsModalOpen(false);
  };

  return (
    <Box p={4}>
      <Text fontSize="3xl" fontWeight="bold">{selectedClass.name}</Text>
      <Text fontSize="xl">{selectedClass.description}</Text>
      <Button colorScheme="blue" onClick={() => setIsModalOpen(true)} mt={4}>Add Student</Button>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Student to {selectedClass.name}</ModalHeader>
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
              onClick={handleAddStudent}
            >
              Add
            </Button>
            <Button variant="ghost" onClick={() => setIsModalOpen(false)}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Box mt={4}>
        <Text fontSize="2xl" fontWeight="bold">Students</Text>
        {selectedClass.students.map((student, index) => (
          <Text key={index}>{student}</Text>
        ))}
      </Box>
    </Box>
  );
};

export default ClassDetails;