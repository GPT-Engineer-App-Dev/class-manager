import { Box, Text } from "@chakra-ui/react";
import { useDocuments, useAddDocument } from '../integrations/supabase';

const Documents = () => {
  const { data: documents, isLoading, error } = useDocuments();
  const addDocument = useAddDocument();

  const handleSave = () => {
    addDocument.mutate({ student_id: documentDetails.student_id, title: documentDetails.title, content: documentDetails.content });
    setDocumentDetails({ student_id: "", title: "", content: "" });
    closeModal();
  };

  return (
    <Box p={4}>
      <Text fontSize="3xl" fontWeight="bold">Documents</Text>
      <Text fontSize="xl">Manage all your student documents here.</Text>
      {/* Add your UI components for displaying and adding documents here */}
      <Button onClick={handleSave}>Save Document</Button>
    </Box>
  );
};

export default Documents;