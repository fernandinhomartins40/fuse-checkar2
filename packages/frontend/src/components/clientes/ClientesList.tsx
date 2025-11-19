
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from "@/components/ui/pagination";
import { 
  MobileTable, 
  MobileTableCard, 
  MobileTableRow, 
  MobileTableHeader, 
  MobileTableActions 
} from "@/components/ui/mobile-table";
import { Eye, Pencil, Trash2 } from 'lucide-react';
import { useClientesData } from '../../hooks/useClientesData';

interface ClientesListProps {
  searchTerm: string;
}

const ClientesList: React.FC<ClientesListProps> = ({ searchTerm }) => {
  const { clientes, deleteCliente } = useClientesData();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Filter clients based on search term
  const filteredClientes = clientes.filter(cliente =>
    cliente.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cliente.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cliente.telefone.includes(searchTerm)
  );

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentClientes = filteredClientes.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredClientes.length / itemsPerPage);

  const handleConfirmDelete = (id: string) => {
    if (window.confirm("Tem certeza que deseja excluir este cliente?")) {
      deleteCliente(id);
    }
  };

  return (
    <>
      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Email</TableHead>
              <TableHead className="hidden lg:table-cell">Telefone</TableHead>
              <TableHead className="hidden lg:table-cell">Veículos</TableHead>
              <TableHead className="hidden lg:table-cell">Cadastro</TableHead>
              <TableHead className="hidden lg:table-cell">Status</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentClientes.length > 0 ? (
              currentClientes.map((cliente) => (
                <TableRow key={cliente.id}>
                  <TableCell className="font-medium">{cliente.nome}</TableCell>
                  <TableCell className="max-w-[200px] truncate">{cliente.email}</TableCell>
                  <TableCell className="hidden lg:table-cell">{cliente.telefone}</TableCell>
                  <TableCell className="hidden lg:table-cell">{cliente.veiculos.length}</TableCell>
                  <TableCell className="hidden lg:table-cell">{new Date(cliente.dataCadastro).toLocaleDateString('pt-BR')}</TableCell>
                  <TableCell className="hidden lg:table-cell">
                    <Badge variant={cliente.ativo ? "default" : "secondary"}>
                      {cliente.ativo ? 'Ativo' : 'Inativo'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Link to={`/clientes/${cliente.id}`}>
                        <Button variant="ghost" size="icon">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Link to={`/clientes/${cliente.id}/editar`}>
                        <Button variant="ghost" size="icon">
                          <Pencil className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Button variant="ghost" size="icon" onClick={() => handleConfirmDelete(cliente.id)}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                  Nenhum cliente encontrado
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Mobile Cards */}
      <MobileTable>
        {currentClientes.length > 0 ? (
          currentClientes.map((cliente) => (
            <MobileTableCard key={cliente.id}>
              <MobileTableHeader>
                {cliente.nome}
              </MobileTableHeader>
              
              <div className="space-y-2">
                <MobileTableRow 
                  label="Email" 
                  value={<span className="text-xs break-all">{cliente.email}</span>} 
                />
                <MobileTableRow 
                  label="Telefone" 
                  value={cliente.telefone} 
                />
                <MobileTableRow 
                  label="Veículos" 
                  value={cliente.veiculos.length} 
                />
                <MobileTableRow 
                  label="Status" 
                  value={
                    <Badge variant={cliente.ativo ? "default" : "secondary"} className="text-xs">
                      {cliente.ativo ? 'Ativo' : 'Inativo'}
                    </Badge>
                  } 
                />
              </div>

              <MobileTableActions>
                <Link to={`/clientes/${cliente.id}`}>
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                </Link>
                <Link to={`/clientes/${cliente.id}/editar`}>
                  <Button variant="ghost" size="sm">
                    <Pencil className="h-4 w-4" />
                  </Button>
                </Link>
                <Button variant="ghost" size="sm" onClick={() => handleConfirmDelete(cliente.id)}>
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </MobileTableActions>
            </MobileTableCard>
          ))
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            Nenhum cliente encontrado
          </div>
        )}
      </MobileTable>

      {totalPages > 1 && (
        <div className="py-4 border-t">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <PaginationItem key={page}>
                  <PaginationLink
                    isActive={currentPage === page}
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}
              
              <PaginationItem>
                <PaginationNext 
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </>
  );
};

export default ClientesList;
