import { useState } from "react";
import { Box, Text, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, FormControl, FormLabel, Input } from "@chakra-ui/react";

const Classes = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [classDetails, setClassDetails] = useState({ name: "", description: "", students: [] });
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [students, setStudents] = useState([]);
  const [studentName, setStudentName] = useState("");

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleClassClick = (cls) => {
    setSelectedClass(cls);
  };

  const handleRemoveClass = (index) => {
    setClasses(classes.filter((_, i) => i !== index));
  };

  const handleAddStudent = (studentName) => {
    const updatedClass = { ...selectedClass, students: [...selectedClass.students, studentName] };
    setClasses(classes.map(cls => cls.name === selectedClass.name ? updatedClass : cls));
    setSelectedClass(updatedClass);
  };

  return (
    <Box p={4}>
      <Text fontSize="3xl" fontWeight="bold">Classes</Text>
      <Text fontSize="xl">Manage all your classes here.</Text>
      <Button colorScheme="blue" onClick={openModal} mt={4}>Add Class</Button>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Class</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Class Name</FormLabel>
              <Input 
                placeholder="Enter class name" 
                value={classDetails.name} 
                onChange={(e) => setClassDetails({ ...classDetails, name: e.target.value })} 
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Description</FormLabel>
              <Input 
                placeholder="Enter class description" 
                value={classDetails.description} 
                onChange={(e) => setClassDetails({ ...classDetails, description: e.target.value })} 
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button 
              colorScheme="blue" 
              mr={3} 
              onClick={() => {
                setClasses([...classes, classDetails]);
                setClassDetails({ name: "", description: "", students: [] });
                closeModal();
              }}
            >
              Save
            </Button>
            <Button variant="ghost" onClick={closeModal}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Box mt={4}>
        {classes.map((cls, index) => (
          <Box key={index} p={2} borderWidth={1} borderRadius="md" mb={2} onClick={() => handleClassClick(cls)}>
            <Text fontSize="lg" fontWeight="bold">{cls.name}</Text>
            <Text>{cls.description}</Text>
            <Button colorScheme="red" size="sm" onClick={(e) => { e.stopPropagation(); handleRemoveClass(index); }}>Remove</Button>
          </Box>
        ))}
      </Box>
      <Modal isOpen={!!selectedClass} onClose={() => setSelectedClass(null)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Student to {selectedClass?.name}</ModalHeader>
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
              onClick={() => {
                handleAddStudent(studentName);
                setStudentName("");
              }}
            >
              Add
            </Button>
            <Button variant="ghost" onClick={() => setSelectedClass(null)}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {selectedClass && (
        <Box mt={4}>
          <Text fontSize="2xl" fontWeight="bold">Students in {selectedClass.name}</Text>
          {selectedClass.students.map((student, index) => (
            <Text key={index}>{student}</Text>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default Classes;