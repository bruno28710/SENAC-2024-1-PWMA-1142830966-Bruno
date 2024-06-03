
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.swing.JOptionPane;

/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/GUIForms/JFrame.java to edit this template
 */
/**
 *
 * @author sales
 */
public class AlterarEstoque extends javax.swing.JFrame {

    private String idp;
    /**
     * Creates new form AlterarEstoque
     */
    public AlterarEstoque() {
        initComponents();
    }

    public AlterarEstoque(String idp, String ite, String qtd, String der) {
        initComponents();
        // Carrega os dados recebidos nos campo da tela
        this.idp = idp;
        txtIdp.setText(idp);
        txtItem.setText(ite);
        txtQuantidade.setText(qtd);
        cmbDepartamento.setSelectedItem(der);
        txtIdp.setEnabled(false);
    }

    /**
     * This method is called from within the constructor to initialize the form.
     * WARNING: Do NOT modify this code. The content of this method is always
     * regenerated by the Form Editor.
     */
    @SuppressWarnings("unchecked")
    // <editor-fold defaultstate="collapsed" desc="Generated Code">//GEN-BEGIN:initComponents
    private void initComponents() {

        jLabel1 = new javax.swing.JLabel();
        jLabel2 = new javax.swing.JLabel();
        cmbDepartamento = new javax.swing.JComboBox<>();
        txtIdp = new javax.swing.JTextField();
        txtQuantidade = new javax.swing.JTextField();
        jLabel3 = new javax.swing.JLabel();
        btnSalvarAlteracao = new javax.swing.JButton();
        txtItem = new javax.swing.JTextField();
        jLabel4 = new javax.swing.JLabel();

        setDefaultCloseOperation(javax.swing.WindowConstants.DISPOSE_ON_CLOSE);
        setTitle("Alterar Estoque");
        getContentPane().setLayout(null);

        jLabel1.setText("Id Produto:");
        getContentPane().add(jLabel1);
        jLabel1.setBounds(60, 20, 60, 20);

        jLabel2.setText("Quantidade:");
        getContentPane().add(jLabel2);
        jLabel2.setBounds(50, 110, 90, 20);

        cmbDepartamento.setModel(new javax.swing.DefaultComboBoxModel<>(new String[] { "Cozinha", "Vendas" }));
        getContentPane().add(cmbDepartamento);
        cmbDepartamento.setBounds(140, 150, 100, 30);
        getContentPane().add(txtIdp);
        txtIdp.setBounds(140, 20, 140, 30);

        txtQuantidade.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                txtQuantidadeActionPerformed(evt);
            }
        });
        getContentPane().add(txtQuantidade);
        txtQuantidade.setBounds(140, 100, 140, 30);

        jLabel3.setText("Departamento:");
        getContentPane().add(jLabel3);
        jLabel3.setBounds(30, 160, 90, 20);

        btnSalvarAlteracao.setForeground(new java.awt.Color(153, 0, 0));
        btnSalvarAlteracao.setText("Salvar alterações");
        btnSalvarAlteracao.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                btnSalvarAlteracaoActionPerformed(evt);
            }
        });
        getContentPane().add(btnSalvarAlteracao);
        btnSalvarAlteracao.setBounds(60, 210, 140, 30);
        getContentPane().add(txtItem);
        txtItem.setBounds(140, 60, 140, 30);

        jLabel4.setText("Item:");
        getContentPane().add(jLabel4);
        jLabel4.setBounds(80, 70, 40, 20);

        setSize(new java.awt.Dimension(468, 308));
        setLocationRelativeTo(null);
    }// </editor-fold>//GEN-END:initComponents

    private void txtQuantidadeActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_txtQuantidadeActionPerformed
        // TODO add your handling code here:
    }//GEN-LAST:event_txtQuantidadeActionPerformed

    private void btnSalvarAlteracaoActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_btnSalvarAlteracaoActionPerformed
        // 1- Pegar os dados dos campos
        String id,i, q, d;
        id = txtIdp.getText();
        i = txtItem.getText();
        q = txtQuantidade.getText();
        d = cmbDepartamento.getSelectedItem().toString();
        try {
            // 2- Conectar com o BD
            Class.forName("com.mysql.cj.jdbc.Driver");
            Connection conectar = DriverManager.getConnection("jdbc:mysql://localhost:3306/restaurante", "root", "");
            // 3- Pegar os dados alterados e devolver para a tabela do BD
            var st = conectar.prepareStatement("UPDATE estoque SET item = ?, quantidade = ?, departamento = ? WHERE idproduto = ?");
            st.setString(1, i);
            st.setString(2, q);
            st.setString(3, d);
            st.setString(4, idp);
            st.executeUpdate(); // executa a alteraçao (UPDATE)
            JOptionPane.showMessageDialog(null,"Item alterado com sucesso");
            dispose(); // fecha a tela
        } catch (ClassNotFoundException | SQLException ex) {
            JOptionPane.showMessageDialog(null,"Entre em contato com o suporte e informe o erro:" + ex.getMessage());
        }

    }//GEN-LAST:event_btnSalvarAlteracaoActionPerformed

    /**
     * @param args the command line arguments
     */
    public static void main(String args[]) {
        /* Set the Nimbus look and feel */
        //<editor-fold defaultstate="collapsed" desc=" Look and feel setting code (optional) ">
        /* If Nimbus (introduced in Java SE 6) is not available, stay with the default look and feel.
         * For details see http://download.oracle.com/javase/tutorial/uiswing/lookandfeel/plaf.html 
         */
        try {
            for (javax.swing.UIManager.LookAndFeelInfo info : javax.swing.UIManager.getInstalledLookAndFeels()) {
                if ("Nimbus".equals(info.getName())) {
                    javax.swing.UIManager.setLookAndFeel(info.getClassName());
                    break;
                }
            }
        } catch (ClassNotFoundException ex) {
            java.util.logging.Logger.getLogger(AlterarEstoque.class.getName()).log(java.util.logging.Level.SEVERE, null, ex);
        } catch (InstantiationException ex) {
            java.util.logging.Logger.getLogger(AlterarEstoque.class.getName()).log(java.util.logging.Level.SEVERE, null, ex);
        } catch (IllegalAccessException ex) {
            java.util.logging.Logger.getLogger(AlterarEstoque.class.getName()).log(java.util.logging.Level.SEVERE, null, ex);
        } catch (javax.swing.UnsupportedLookAndFeelException ex) {
            java.util.logging.Logger.getLogger(AlterarEstoque.class.getName()).log(java.util.logging.Level.SEVERE, null, ex);
        }
        //</editor-fold>

        /* Create and display the form */
        java.awt.EventQueue.invokeLater(new Runnable() {
            public void run() {
                new AlterarEstoque().setVisible(true);
            }
        });
    }

    // Variables declaration - do not modify//GEN-BEGIN:variables
    private javax.swing.JButton btnSalvarAlteracao;
    private javax.swing.JComboBox<String> cmbDepartamento;
    private javax.swing.JLabel jLabel1;
    private javax.swing.JLabel jLabel2;
    private javax.swing.JLabel jLabel3;
    private javax.swing.JLabel jLabel4;
    private javax.swing.JTextField txtIdp;
    private javax.swing.JTextField txtItem;
    private javax.swing.JTextField txtQuantidade;
    // End of variables declaration//GEN-END:variables
}