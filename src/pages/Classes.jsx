import { useState } from "react";
import { useClasses, useAddClass } from '../integrations/supabase';
import { Box, Text, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Classes = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [classDetails, setClassDetails] = useState({ name: "", description: "" });
  const { data: classes, isLoading, error } = useClasses();
  const navigate = useNavigate();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const removeClass = (index) => {
    const newClasses = [...classes];
    newClasses.splice(index, 1);
    setClasses(newClasses);
  };

  const addClass = useAddClass();

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
                addClass.mutate({ name: classDetails.name, description: classDetails.description });
                setClassDetails({ name: "", description: "" });
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
          <Box key={index} p={2} borderWidth={1} borderRadius="md" mb={2} display="flex" justifyContent="space-between" alignItems="center">
            <Box onClick={() => navigate(`/classes/${index}`)} cursor="pointer">
              <Text fontSize="lg" fontWeight="bold">{cls.name}</Text>
              <Text>{cls.description}</Text>
            </Box>
            <Button colorScheme="red" onClick={() => removeClass(index)}>Delete</Button>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Classes;