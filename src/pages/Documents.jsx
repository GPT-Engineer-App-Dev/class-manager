import { Box, Text, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { useState } from "react";
import { useDocuments, useAddDocument } from "../integrations/supabase/index.js";

const Documents = () => {
  const { data: documents = [], refetch } = useDocuments();
  const addDocumentMutation = useAddDocument();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [documentDetails, setDocumentDetails] = useState({ title: "", content: "", student_id: "" });

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const addDocument = async () => {
    await addDocumentMutation.mutateAsync(documentDetails);
    setDocumentDetails({ title: "", content: "", student_id: "" });
    closeModal();
    refetch();
  };

  return (
    <Box p={4}>
      <Text fontSize="3xl" fontWeight="bold">Documents</Text>
      <Text fontSize="xl">Manage all your student documents here.</Text>
      <Button colorScheme="blue" onClick={openModal} mt={4}>Add Document</Button>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Document</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Title</FormLabel>
              <Input 
                placeholder="Enter document title" 
                value={documentDetails.title} 
                onChange={(e) => setDocumentDetails({ ...documentDetails, title: e.target.value })} 
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Content</FormLabel>
              <Input 
                placeholder="Enter document content" 
                value={documentDetails.content} 
                onChange={(e) => setDocumentDetails({ ...documentDetails, content: e.target.value })} 
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Student ID</FormLabel>
              <Input 
                placeholder="Enter student ID" 
                value={documentDetails.student_id} 
                onChange={(e) => setDocumentDetails({ ...documentDetails, student_id: e.target.value })} 
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button 
              colorScheme="blue" 
              mr={3} 
              onClick={addDocument}
            >
              Save
            </Button>
            <Button variant="ghost" onClick={closeModal}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Box mt={4}>
        {documents.map((doc) => (
          <Box key={doc.id} p={2} borderWidth={1} borderRadius="md" mb={2}>
            <Text fontSize="lg" fontWeight="bold">{doc.title}</Text>
            <Text>{doc.content}</Text>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Documents;